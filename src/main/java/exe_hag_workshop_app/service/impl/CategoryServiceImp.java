package exe_hag_workshop_app.service.impl;

import exe_hag_workshop_app.dto.CategoryDTO;
import exe_hag_workshop_app.entity.ProductCategory;
import exe_hag_workshop_app.payload.CategoryRequest;
import exe_hag_workshop_app.repository.ProductCategoryRepository;
import exe_hag_workshop_app.service.CategoryService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class CategoryServiceImp implements CategoryService {
    @Autowired
    ProductCategoryRepository cateRepo;

    public List<CategoryDTO> transferToDTO(List<ProductCategory> object) {
        List<CategoryDTO> dtos = new ArrayList<>();

        for (ProductCategory productCategory : object) {
            CategoryDTO dto = new CategoryDTO();
            dto.setCategoryId(productCategory.getCategoryId());
            dto.setDescription(productCategory.getDescription());
            dto.setCategoryName(productCategory.getCategoryName());
            dtos.add(dto);
        }
        return dtos;
    }

    @Override

    public List<CategoryDTO> getAll() {
        List<ProductCategory> productCategories = cateRepo.findAll();
        return transferToDTO(productCategories);
    }

    @Override
    public CategoryDTO addCategory(CategoryRequest request) {
        try {
            CategoryDTO dto = new CategoryDTO();
            ProductCategory newCate = new ProductCategory();
            newCate.setCategoryName(request.getCategoryName());
            newCate.setDescription(request.getDescription());
            cateRepo.save(newCate);

            BeanUtils.copyProperties(request, dto);
            return dto;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public CategoryDTO updateCategory(CategoryRequest request, int id) {
        try {
            CategoryDTO dto = new CategoryDTO();
            ProductCategory updateCate = cateRepo.findById(id).get();
            updateCate.setCategoryName(request.getCategoryName());
            updateCate.setDescription(request.getDescription());
            cateRepo.save(updateCate);
            dto.setCategoryId(id);

            BeanUtils.copyProperties(request, dto);
            return dto;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public boolean deleteCategory(int id) {
        try {
            ProductCategory deleteCate = cateRepo.findById(id).get();
            cateRepo.delete(deleteCate);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return false;
    }
}
