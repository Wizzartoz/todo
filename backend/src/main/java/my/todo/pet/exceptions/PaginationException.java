package my.todo.pet.exceptions;

public class PaginationException extends RuntimeException {
    public PaginationException(String msg) {
        super(msg);
    }
}
