package my.todo.pet.controllers;

import my.todo.pet.dto.ExceptionDto;
import my.todo.pet.exceptions.PaginationException;
import my.todo.pet.exceptions.TaskNotFoundException;
import my.todo.pet.exceptions.UserNotFoundException;
import my.todo.pet.models.*;
import my.todo.pet.services.TaskService;
import my.todo.pet.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import javax.validation.Valid;
import java.util.List;
import java.util.Objects;


@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    private final TaskService taskService;
    private final UserService userService;


    @Autowired
    public TaskController(TaskService taskService, UserService userService) {
        this.taskService = taskService;
        this.userService = userService;
    }

    @GetMapping
    private ResponseEntity<List<Task>> findAll(@RequestParam(required = false) String username) {
        if (Objects.isNull(username)) {
            return ResponseEntity.ok(taskService.findAll());
        }
        User user = userService.findByLogin(username);
        return ResponseEntity.ok(taskService.findByUser(user));
    }

    @PostMapping("/{username}")
    public ResponseEntity<Task> addTask(@RequestBody @Valid Task task,
                                        BindingResult bindingResult,
                                        @PathVariable("username") String username) {
        if (bindingResult.hasErrors()) {
            ResponseEntity.badRequest();
        }
        task.setUser(userService.findByLogin(username));
        Task newTask = taskService.save(task);
        return ResponseEntity.ok(newTask);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTask(@PathVariable long id) {
        taskService.delete(id);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @PatchMapping("/{id}/{status}")
    public ResponseEntity<Task> updateTaskStatus(@PathVariable Long id, @PathVariable String status) {
        Task task = taskService.findById(id);
        task.setStatus(Status.valueOf(status));
        return ResponseEntity.ok(taskService.save(task));
    }

    @ExceptionHandler({UserNotFoundException.class, TaskNotFoundException.class, PaginationException.class})
    private ResponseEntity<?> handleException(Exception e) {
        return ResponseEntity
                .badRequest()
                .body(ExceptionDto
                        .builder()
                        .message(e.getMessage())
                        .build());
    }

    @ExceptionHandler({MethodArgumentTypeMismatchException.class})
    private ResponseEntity<?> handleMethodArgumentException() {
        return ResponseEntity
                .badRequest()
                .body(ExceptionDto
                        .builder()
                        .message("Incorrect request parameter value")
                        .build());
    }
}
