package my.todo.pet.exceptions;

public class TaskNotFoundException extends RuntimeException {
    public TaskNotFoundException(String msg){
        super(msg);
    }
}
