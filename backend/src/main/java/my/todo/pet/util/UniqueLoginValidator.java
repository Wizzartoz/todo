package my.todo.pet.util;


import my.todo.pet.exceptions.UserNotFoundException;
import my.todo.pet.models.User;
import my.todo.pet.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

@Component
public class UniqueLoginValidator implements Validator {

    private final UserService userService;

    @Autowired
    public UniqueLoginValidator(UserService userService) {
        this.userService = userService;
    }

    @Override
    public boolean supports(Class<?> clazz) {
        return User.class.equals(clazz);
    }

    @Override
    public void validate(Object target, Errors errors) {
        User user = (User) target;
        try {
            userService.findByLogin(user.getLogin());
            errors.rejectValue("login", "", "This login is already exist");
        } catch (UserNotFoundException ignored) {

        }
    }
}
