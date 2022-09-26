package my.todo.pet.exceptions;

public class AuthenticationException extends RuntimeException{
    public AuthenticationException(String msg) {
        super(msg);
    }
}
