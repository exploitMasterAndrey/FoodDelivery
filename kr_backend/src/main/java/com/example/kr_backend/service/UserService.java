package com.example.kr_backend.service;

import com.example.kr_backend.model.User;
import com.example.kr_backend.repository.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService implements UserDetailsService {
    private final UserRepo userRepo;

    public void save(User user){
        userRepo.save(user);
    }
    public boolean existsByUserName(String userName){
        Optional<User> byUsername = userRepo.findByUsername(userName);
        if (byUsername.isEmpty()) return false;
        else return true;
    }
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepo.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("No user with username = " + username));
    }

}
