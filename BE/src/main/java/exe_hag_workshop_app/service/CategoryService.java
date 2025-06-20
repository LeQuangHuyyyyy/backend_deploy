package exe_hag_workshop_app.service;

import exe_hag_workshop_app.dto.CategoryDTO;
import exe_hag_workshop_app.payload.CategoryRequest;

import java.util.ArrayList;
import java.util.List;

public interface CategoryService {

    List<CategoryDTO> getAll();

    CategoryDTO addCategory(CategoryRequest request);

    CategoryDTO updateCategory(CategoryRequest request, int id);

    boolean deleteCategory(int id);

}
