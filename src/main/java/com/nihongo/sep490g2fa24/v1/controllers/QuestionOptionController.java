package com.nihongo.sep490g2fa24.v1.controllers;

import com.nihongo.sep490g2fa24.v1.dtos.course.QuestionOptionDTO;
import com.nihongo.sep490g2fa24.v1.model.QuestionOption;
import com.nihongo.sep490g2fa24.v1.services.impl.QuestionOptionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/options")
@RequiredArgsConstructor
public class QuestionOptionController {
    private final QuestionOptionService optionService;

    @GetMapping
    public BaseApiResponse<List<QuestionOptionDTO>> getAllOptions() {
        return BaseApiResponse.succeed(optionService.getAllOptions());
    }

    @GetMapping("/{id}")
    public BaseApiResponse<QuestionOptionDTO> getOptionById(@PathVariable String id) {
        return BaseApiResponse.succeed(optionService.getOptionById(id));
    }

    @PostMapping
    public BaseApiResponse<QuestionOption> createOption(@RequestBody QuestionOption option) {
        return BaseApiResponse.succeed(optionService.createOption(option));
    }

    @PutMapping("/{id}")
    public BaseApiResponse<QuestionOption> updateOption(
            @PathVariable String id,
            @RequestBody QuestionOption option) {
        return BaseApiResponse.succeed(optionService.updateOption(id, option));
    }

    @DeleteMapping("/{id}")
    public BaseApiResponse<Void> deleteOption(@PathVariable String id) {
        optionService.deleteOption(id);
        return BaseApiResponse.succeed();
    }
}
