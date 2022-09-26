package my.todo.pet.util;

import lombok.experimental.UtilityClass;
import my.todo.pet.dto.RegisterDto;
import my.todo.pet.models.User;

@UtilityClass
public class MapperUtil {
    public User registerDtoToUser(RegisterDto registerDto){
        User user = new User();
        user.setLogin(registerDto.getLogin());
        user.setPassword(registerDto.getPassword());
        user.setEmail(registerDto.getEmail());
        user.setRole(registerDto.getRole());
        return user;
    }
}
