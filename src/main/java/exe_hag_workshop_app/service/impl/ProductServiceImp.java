package exe_hag_workshop_app.service.impl;

import exe_hag_workshop_app.dto.ProductDTO;
import exe_hag_workshop_app.entity.Enums.Roles;
import exe_hag_workshop_app.entity.ProductCategory;
import exe_hag_workshop_app.entity.Products;
import exe_hag_workshop_app.entity.Users;
import exe_hag_workshop_app.entity.ImageProduct;
import exe_hag_workshop_app.payload.ImageProductDTO;
import exe_hag_workshop_app.payload.ProductRequest;
import exe_hag_workshop_app.payload.ProductResponse;
import exe_hag_workshop_app.repository.ProductCategoryRepository;
import exe_hag_workshop_app.repository.ProductRepository;
import exe_hag_workshop_app.repository.UserRepository;
import exe_hag_workshop_app.repository.ImageProductRepository;
import exe_hag_workshop_app.utils.JwtTokenHelper;
import jakarta.transaction.Transactional;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;


@Service
public class ProductServiceImp implements exe_hag_workshop_app.service.ProductService {
    @Autowired
    ProductRepository productRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    ProductCategoryRepository productCategoryRepository;

    @Autowired
    JwtTokenHelper helper;

    @Override
    public Page<ProductResponse> getAllProducts(Pageable pageable) {
        try {
            Pageable sortedPageable = PageRequest.of(
                    pageable.getPageNumber(),
                    pageable.getPageSize(),
                    Sort.by(Sort.Direction.DESC, "price")
            );

            Page<Products> productsPage = productRepository.findAll(sortedPageable);

            return productsPage.map(pd -> {
                ProductResponse response = new ProductResponse();
                BeanUtils.copyProperties(pd, response);
                response.setNameCreateBy(pd.getCreateBy().getFirstName() + " " + pd.getCreateBy().getLastName());
                response.setCategoryName(pd.getCategory().getCategoryName());

                List<ImageProductDTO> imageUrls = pd.getImages().stream().map(imageProduct -> {
                    ImageProductDTO imageDTO = new ImageProductDTO();
                    BeanUtils.copyProperties(imageProduct, imageDTO);
                    return imageDTO;
                }).collect(Collectors.toList());

                response.setImages(imageUrls);
                return response;
            });

        } catch (Exception e) {
            e.printStackTrace();
            return Page.empty();
        }
    }

    @Override
    @Transactional
    public ProductResponse createProduct(ProductRequest request) {
        Products product = new Products();
        int id = helper.getUserIdFromToken();
        ProductResponse response = new ProductResponse();
        try {
            Users user = userRepository.findById(id).get();
            if (user.getRole() != Roles.ADMIN) {
                return null;
            }
            product.setProductName(request.getProductName());
            product.setDescription(request.getDescription());
            product.setPrice(request.getPrice());
            product.setCreateBy(user);
            ProductCategory category = productCategoryRepository.findById(request.getCategoryId()).get();
            product.setCategory(category);

            // Test tạo image product
            ImageProduct imageProduct = new ImageProduct();
            imageProduct.setImageUrl("test.jpg");
            imageProduct.setDescription("Test image");
            imageProduct.setProduct(product);
            product.getImages().add(imageProduct);

            productRepository.save(product);

            BeanUtils.copyProperties(product, response);
            response.setNameCreateBy(user.getFirstName() + " " + user.getLastName());
            response.setCategoryName(product.getCategory().getCategoryName());
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
        return response;
    }

    @Override
    @Transactional
    public ProductResponse updateProduct(ProductRequest request, int productId) {
        Products product;
        ProductResponse response = new ProductResponse();
        int id = helper.getUserIdFromToken();
        try {
            Users user = userRepository.findById(id).get();
            product = productRepository.findById(productId).get();

            product.setProductName(request.getProductName());
            product.setDescription(request.getDescription());
            product.setPrice(request.getPrice());
            product.setCreateBy(user);
            ProductCategory category = productCategoryRepository.findById(request.getCategoryId()).get();
            product.setCategory(category);
            productRepository.save(product);

            BeanUtils.copyProperties(product, response);
            response.setNameCreateBy(user.getFirstName() + " " + user.getLastName());
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
        return response;
    }

    @Override
    @Transactional
    public boolean deleteProduct(int id) {
        try {
            Products product = productRepository.findById(id).get();
            product.setDeleted(true);
            productRepository.save(product);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public ProductResponse getProductById(int productId) {
        Products product;
        ProductResponse response = new ProductResponse();
        try {
            product = productRepository.findById(productId).orElseThrow(() -> new RuntimeException("Product not found with id: " + productId));
            BeanUtils.copyProperties(product, response);
            response.setNameCreateBy(product.getCreateBy().getFirstName() + " " + product.getCreateBy().getLastName());
            response.setCategoryName(product.getCategory().getCategoryName());
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
        return response;
    }
}
