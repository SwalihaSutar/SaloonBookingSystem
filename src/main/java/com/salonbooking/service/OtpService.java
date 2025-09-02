package com.salonbooking.service;

import com.salonbooking.model.Otp;
import com.salonbooking.repository.OtpRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;

import java.time.LocalDateTime;
import java.util.Random;
import java.util.Set;
import java.util.HashSet;


@Service
public class OtpService {

    @Autowired
    private OtpRepository otpRepository;

    @Autowired
    private EmailService emailService;
    
    private Set<String> verifiedEmails = new HashSet<>();

    public void generateAndSendOtp(String email) {
        String otp = String.valueOf(100000 + new Random().nextInt(900000));
        LocalDateTime expiry = LocalDateTime.now().plusMinutes(5);

        Otp otpRecord = otpRepository.findByEmail(email).orElse(new Otp());
        otpRecord.setEmail(email);
        otpRecord.setOtp(otp);
        otpRecord.setExpiryTime(expiry);

        otpRepository.save(otpRecord);
        emailService.sendOtpEmail(email, otp);
    }

    public boolean validateOtp(String email, String userInputOtp) {
        return otpRepository.findByEmail(email)
            .filter(o -> o.getOtp().equals(userInputOtp) && o.getExpiryTime().isAfter(LocalDateTime.now()))
            .isPresent();
    }


    public boolean isEmailVerified(String email) {
        return verifiedEmails.contains(email);
    

    
    
    }

    public boolean verifyOtp(String email, String otp) {
        Optional<Otp> otpRecordOpt = otpRepository.findByEmail(email);

        if (otpRecordOpt.isPresent()) {
            Otp otpRecord = otpRecordOpt.get();

            boolean isValid = otpRecord.getOtp().equals(otp)
                    && otpRecord.getExpiryTime().isAfter(LocalDateTime.now());

            if (isValid) {
                // Optional: mark email as verified
                verifiedEmails.add(email);

                // Optional: delete OTP after successful verification
                otpRepository.delete(otpRecord);
            }

            return isValid;
        }

        return false;
    }

}
