package com.nihongo.sep490g2fa24.v1.controllers;

import com.nihongo.sep490g2fa24.v1.dtos.course.TestDTO;
import com.nihongo.sep490g2fa24.v1.model.Test;
import com.nihongo.sep490g2fa24.v1.services.impl.TestService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// Controllers
@RestController
@RequestMapping("/api/v1/tests")
@RequiredArgsConstructor
public class TestController {
    private final TestService testService;

    @GetMapping
    public BaseApiResponse<List<TestDTO>> getAllTests(HttpServletRequest request) {
        return BaseApiResponse.succeed(testService.getAllTests(request.getRemoteUser()));
    }
    @GetMapping("/a")
    public BaseApiResponse<List<TestDTO>> getAllTestsForUser() {
        return BaseApiResponse.succeed(testService.getAllTestsForUser());
    }


    @GetMapping("/{id}")
    public BaseApiResponse<TestDTO> getTestById(@PathVariable String id) {
        return BaseApiResponse.succeed(testService.getTestById(id));
    }

    @PostMapping
    public BaseApiResponse<Test> createTest(@RequestBody Test test) {
        return BaseApiResponse.succeed(testService.createTest(test));
    }

    @PutMapping("/{id}")
    public BaseApiResponse<Test> updateTest(@PathVariable String id, @RequestBody Test test) {
        return BaseApiResponse.succeed(testService.updateTest(id, test));
    }

    @DeleteMapping("/{id}")
    public BaseApiResponse<Void> deleteTest(@PathVariable String id) {
        testService.deleteTest(id);
        return BaseApiResponse.succeed();
    }
}