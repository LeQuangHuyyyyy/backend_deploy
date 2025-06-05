package exe_hag_workshop_app.controller;

import exe_hag_workshop_app.payload.CategoryRequest;
import exe_hag_workshop_app.payload.ResponseData;
import exe_hag_workshop_app.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {
    @Autowired
    CategoryService service;

    @GetMapping
    public ResponseEntity<?> getAll() {
        ResponseData data = new ResponseData();
        data.setData(service.getAll());
        data.setStatus(200);
        data.setDescription("get All cate");
        return new ResponseEntity<>(data, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<?> addCate(@RequestBody CategoryRequest request) {
        ResponseData data = new ResponseData();
        data.setData(service.addCategory(request));
        data.setStatus(201);
        return new ResponseEntity<>(data, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateCate(@RequestBody CategoryRequest request, @PathVariable int id) {
        ResponseData data = new ResponseData();
        data.setData(service.updateCategory(request, id));
        data.setStatus(200);
        return new ResponseEntity<>(data, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCate(@PathVariable int id) {
        ResponseData data = new ResponseData();
        if (service.deleteCategory(id)) {
            return new ResponseEntity<>("delete successfuly", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("delete failed", HttpStatus.BAD_REQUEST);
        }
    }
}
