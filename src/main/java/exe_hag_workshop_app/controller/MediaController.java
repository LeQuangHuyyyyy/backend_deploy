package exe_hag_workshop_app.controller;

import exe_hag_workshop_app.dto.MediaDTO;
import exe_hag_workshop_app.service.MediaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/media")
@CrossOrigin(origins = "*")
public class MediaController {

    @Autowired
    private MediaService mediaService;

    @PostMapping
    public ResponseEntity<MediaDTO> createMedia(@RequestBody MediaDTO mediaDTO) {
        MediaDTO createdMedia = mediaService.createMedia(mediaDTO);
        return new ResponseEntity<>(createdMedia, HttpStatus.CREATED);
    }

    @PutMapping("/{mediaId}")
    public ResponseEntity<MediaDTO> updateMedia(@PathVariable Integer mediaId, @RequestBody MediaDTO mediaDTO) {
        MediaDTO updatedMedia = mediaService.updateMedia(mediaId, mediaDTO);
        return ResponseEntity.ok(updatedMedia);
    }

    @DeleteMapping("/{mediaId}")
    public ResponseEntity<Void> deleteMedia(@PathVariable Integer mediaId) {
        mediaService.deleteMedia(mediaId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{mediaId}")
    public ResponseEntity<MediaDTO> getMediaById(@PathVariable Integer mediaId) {
        MediaDTO media = mediaService.getMediaById(mediaId);
        return ResponseEntity.ok(media);
    }
    
}