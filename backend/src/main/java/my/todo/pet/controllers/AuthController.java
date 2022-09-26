package my.todo.pet.controllers;

import my.todo.pet.dto.ExceptionDto;
import my.todo.pet.dto.LoginDto;
import my.todo.pet.dto.RegisterDto;
import my.todo.pet.exceptions.AuthenticationException;
import my.todo.pet.exceptions.UserValidException;
import my.todo.pet.models.User;
import my.todo.pet.responses.JWTResponse;
import my.todo.pet.security.JWTUtil;
import my.todo.pet.security.PersonDetails;
import my.todo.pet.services.RegistrationService;
import my.todo.pet.util.MapperUtil;
import my.todo.pet.util.UniqueLoginValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import java.util.ArrayList;


@RestController
@RequestMapping("/api")
public class AuthController {
    private final UniqueLoginValidator uniqueLoginValidator;
    private final JWTUtil jwtUtil;
    private final RegistrationService registrationService;
    private final AuthenticationManager authenticationManager;

    @Autowired
    public AuthController(UniqueLoginValidator uniqueLoginValidator, JWTUtil jwtUtil,
                          RegistrationService registrationService,
                          AuthenticationManager authenticationManager) {
        this.uniqueLoginValidator = uniqueLoginValidator;
        this.jwtUtil = jwtUtil;
        this.registrationService = registrationService;
        this.authenticationManager = authenticationManager;
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody @Valid RegisterDto dto, BindingResult bindingResult) {
        User user = MapperUtil.registerDtoToUser(dto);
        uniqueLoginValidator.validate(user, bindingResult);
        if (bindingResult.hasErrors()) {
            throw new UserValidException("User doesn't valid");
        }
        registrationService.register(user);
        String token = jwtUtil.generateToken(user.getLogin());
        return ResponseEntity.ok(JWTResponse.builder()
                .token(token)
                .username(user.getLogin())
                .role(user.getRole())
                .build());
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody @Valid LoginDto dto, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            throw new UserValidException("User doesn't valid");
        }
        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(dto.getLogin(), dto.getPassword());
        Authentication authentication;
        try {
            authentication = authenticationManager.authenticate(authenticationToken);
        } catch (BadCredentialsException e) {
            throw new AuthenticationException("Login or password doesn't valid");
        }
        String token = jwtUtil.generateToken(dto.getLogin());
        PersonDetails personDetails = (PersonDetails) authentication.getPrincipal();
        return ResponseEntity.ok(JWTResponse.builder()
                .token(token)
                .username(personDetails.getUsername())
                .role(new ArrayList<>(personDetails.getAuthorities())
                        .get(0).toString())
                .build());
    }

    @ExceptionHandler({AuthenticationException.class, UserValidException.class})
    public ResponseEntity<?> handleUserValidException(Exception e) {
        return ResponseEntity.badRequest()
                .body(ExceptionDto
                        .builder()
                        .message(e.getMessage())
                        .build());
    }
}
