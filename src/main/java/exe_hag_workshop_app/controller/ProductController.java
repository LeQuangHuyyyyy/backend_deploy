package exe_hag_workshop_app.controller;


import exe_hag_workshop_app.payload.ProductRequest;
import exe_hag_workshop_app.payload.ProductResponse;
import exe_hag_workshop_app.payload.ResponseData;
import exe_hag_workshop_app.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    ProductService productServiceImp;

    @GetMapping
    public ResponseEntity<?> getAllProducts(@RequestParam(value = "page", defaultValue = "0") int page,
                                            @RequestParam(value = "size", defaultValue = "10") int size) {
        try {
            ResponseData responseData = new ResponseData();
            Pageable pageable = Pageable.ofSize(size).withPage(page);
            responseData.setData(productServiceImp.getAllProducts(pageable));
            return new ResponseEntity<>(responseData, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping
    public ResponseEntity<?> createProduct(@RequestBody ProductRequest request) {
        try {
            ResponseData responseData = new ResponseData();
            ProductResponse response = productServiceImp.createProduct(request);
            if (response != null) {
                responseData.setData(response);
                return new ResponseEntity<>(responseData, HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Cannot create Product", HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Cannot create Product", HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/{productId}")
    public ResponseEntity<?> updateProduct(@PathVariable int productId, @RequestBody ProductRequest request) {
        try {
            ProductResponse response = productServiceImp.updateProduct(request, productId);
            if (response != null) {
                return new ResponseEntity<>(response, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/{productId}")
    public ResponseEntity<?> deleteProduct(@PathVariable int productId) {
        try {
            boolean isDeleted = productServiceImp.deleteProduct(productId);
            if (isDeleted) {
                return new ResponseEntity<>("Delete successfully", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("cook", HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("cook", HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/{productId}")
    public ResponseEntity<?> getProductById(@PathVariable int productId) {
        try {
            ProductResponse response = productServiceImp.getProductById(productId);
            if (response != null) {
                return new ResponseEntity<>(response, HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Product not found", HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Error retrieving product", HttpStatus.BAD_REQUEST);
        }
    }
}
