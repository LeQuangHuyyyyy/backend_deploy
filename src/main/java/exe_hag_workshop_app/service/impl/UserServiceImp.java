package exe_hag_workshop_app.service.impl;

import exe_hag_workshop_app.dto.AuthResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.util.UUID;

@Service
public class UserServiceImp implements exe_hag_workshop_app.service.UserService {
    @Value("${imagekit.privateKey}")
    private String privateKey;

    @Value("${imagekit.publicKey}")
    private String publicKey;

    public AuthResponse getAuth() throws Exception {
        String token = UUID.randomUUID().toString();
        long expire = (System.currentTimeMillis() / 1000L) + 300; // hết hạn sau 5 phút

        String signature = generateSignature(token, String.valueOf(expire), privateKey);

        return new AuthResponse(token, signature, String.valueOf(expire), publicKey, null, null, null);
    }

    private String generateSignature(String token, String expire, String secret) throws Exception {
        String data = token + expire;
        Mac sha1_HMAC = Mac.getInstance("HmacSHA1");
        SecretKeySpec secret_key = new SecretKeySpec(secret.getBytes(), "HmacSHA1");
        sha1_HMAC.init(secret_key);

        byte[] rawHmac = sha1_HMAC.doFinal(data.getBytes());
        return bytesToHex(rawHmac);
    }

    private String bytesToHex(byte[] bytes) {
        StringBuilder sb = new StringBuilder();
        for (byte b : bytes) sb.append(String.format("%02x", b));
        return sb.toString();
    }
}
