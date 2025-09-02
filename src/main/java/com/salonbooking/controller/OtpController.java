package com.salonbooking.controller;

import com.salonbooking.service.OtpService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
@CrossOrigin
@RestController
@RequestMapping("/api/otp")
public class OtpController {

    @Autowired
    private OtpService otpService;

    @PostMapping("/send")
    public String sendOtp(@RequestBody Map<String, String> request) {
        otpService.generateAndSendOtp(request.get("email"));
        return "OTP sent!";
    }

    @PostMapping("/validate")
    public String validateOtp(@RequestBody Map<String, String> request) {
        boolean isValid = otpService.validateOtp(request.get("email"), request.get("otp"));
        return isValid ? "OTP verified successfully!" : "Invalid or expired OTP";
    }
}
