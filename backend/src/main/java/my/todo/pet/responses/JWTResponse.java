package my.todo.pet.responses;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class JWTResponse {
    private String token;
    private String username;
    private String role;


    public JWTResponse(String token, String username, String role) {
        this.token = token;
        this.username = username;
        this.role = role;
    }
}
