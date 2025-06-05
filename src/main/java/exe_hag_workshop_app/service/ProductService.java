package exe_hag_workshop_app.service;

import exe_hag_workshop_app.payload.ProductRequest;
import exe_hag_workshop_app.payload.ProductResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ProductService {
    Page<ProductResponse> getAllProducts(Pageable pageable);

    ProductResponse createProduct(ProductRequest request);

    ProductResponse updateProduct(ProductRequest request, int productId);

    boolean deleteProduct(int productId);

    ProductResponse getProductById(int productId);
}
