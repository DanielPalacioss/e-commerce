package com.daniel.ecommerce.shared.exception.handler;

import com.daniel.ecommerce.shared.exception.custom.ConflictException;
import com.daniel.ecommerce.shared.exception.custom.FileUploadException;
import com.daniel.ecommerce.shared.exception.custom.ResourceNotFoundException;
import com.daniel.ecommerce.shared.exception.dto.InvalidParam;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.ConstraintViolationException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.net.URI;
import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ProblemDetail> handleNotFound(ResourceNotFoundException ex, HttpServletRequest request) {
        ProblemDetail problem = buildProblem(HttpStatus.NOT_FOUND, "Resource not found", ex.getMessage(), request);
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(problem);
    }

    @ExceptionHandler(ConflictException.class)
    public ResponseEntity<ProblemDetail> handleConflict(ConflictException ex, HttpServletRequest request) {
        ProblemDetail problem = buildProblem(HttpStatus.CONFLICT, "Conflict in the request", ex.getMessage(), request);
        return ResponseEntity.status(HttpStatus.CONFLICT).body(problem);
    }

    @ExceptionHandler(FileUploadException.class)
    public ResponseEntity<ProblemDetail> handleFileUpload(FileUploadException ex, HttpServletRequest request) {
        ProblemDetail problem = buildProblem(HttpStatus.INTERNAL_SERVER_ERROR, "File upload error", ex.getMessage(), request);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(problem);
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<ProblemDetail> handleFileUpload(DataIntegrityViolationException ex, HttpServletRequest request) {
        String detailMessage = "Data integrity violation";
        if (ex.getCause() != null) {
            detailMessage = ex.getCause().getMessage();
        }
        ProblemDetail problem = buildProblem(HttpStatus.CONFLICT, "Integrity error", detailMessage, request);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(problem);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ProblemDetail> handleValidationException(MethodArgumentNotValidException ex, HttpServletRequest request) {
        ProblemDetail problem = buildProblem(HttpStatus.BAD_REQUEST, "Validation Error", "One or more fields are invalid", request);
        // Detalles de validación
        List<InvalidParam> invalidParams = ex.getBindingResult()
                .getFieldErrors()
                .stream()
                .map(error -> new InvalidParam(error.getField(), error.getDefaultMessage()))
                .collect(Collectors.toList());

        problem.setProperty("invalid_params", invalidParams);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(problem);
    }

    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<ProblemDetail> handleConstraintViolation(ConstraintViolationException ex, HttpServletRequest request) {
        ProblemDetail problem = buildProblem(HttpStatus.BAD_REQUEST, "Validation Error", ex.getConstraintViolations().stream().map(constraintViolation -> constraintViolation.getMessage().concat(", ")).collect(Collectors.joining()), request);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(problem);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ProblemDetail> handleGeneric(Exception ex, HttpServletRequest request) {
        ProblemDetail problem = buildProblem(HttpStatus.INTERNAL_SERVER_ERROR, "Internal server error", ex.getMessage(), request);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(problem);
    }

    private ProblemDetail buildProblem(HttpStatus status, String title, String detail, HttpServletRequest request) {
        ProblemDetail problem = ProblemDetail.forStatus(status);
        problem.setTitle(title);
        problem.setDetail(detail);
        problem.setInstance(URI.create(request.getRequestURI()));
        problem.setProperty("timestamp", Instant.now());
        return problem;
    }

}

