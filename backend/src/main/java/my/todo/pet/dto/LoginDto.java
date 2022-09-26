package my.todo.pet.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoginDto {
    @NotEmpty
    @Size(max = 20)
    private String login;
    @NotEmpty
    @Size(max = 20)
    private String password;
}
