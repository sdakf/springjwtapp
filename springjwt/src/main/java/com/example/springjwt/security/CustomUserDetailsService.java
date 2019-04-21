package com.example.springjwt.security;

import com.example.springjwt.domain.User;
import com.example.springjwt.domain.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class CustomUserDetailsService implements UserDetailsService {

    private UserRepository users;

    public CustomUserDetailsService(UserRepository users) {
        this.users = users;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> byUsername = this.users.findByUsername(username);
        return byUsername
                .orElseThrow(() -> new UsernameNotFoundException("Username: " + username + " not found"));
    }
}