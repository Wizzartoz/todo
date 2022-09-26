package my.todo.pet.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RegisterDto {
    @NotEmpty
    private String login;
    @NotEmpty
    private String password;
    @Email
    private String email;
    @NotEmpty
    private String role;
}
