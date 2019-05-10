package com.example.springjwt.web;

import com.example.springjwt.domain.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController(value = "/v1/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @RequestMapping
    public ResponseEntity all(){
        return ResponseEntity.ok().body(userRepository.findAll());
    }
}
