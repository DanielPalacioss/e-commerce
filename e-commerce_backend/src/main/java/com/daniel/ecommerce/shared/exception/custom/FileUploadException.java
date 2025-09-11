package com.daniel.ecommerce.shared.exception.custom;

public class FileUploadException extends RuntimeException{
    public FileUploadException(String message){
        super(message);
    }
}
