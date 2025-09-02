package com.salonbooking.security;

import com.salonbooking.model.User;
import com.salonbooking.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

@Service
@Primary
public class MyUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username)
            .orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));

        org.springframework.security.core.userdetails.User.UserBuilder builder =
                org.springframework.security.core.userdetails.User.withUsername(user.getUsername());

        builder.password(user.getPassword());
        builder.roles(user.getRole());

        return builder.build();
    }
}
