package my.todo.pet.services;

import lombok.SneakyThrows;
import my.todo.pet.exceptions.PaginationException;
import my.todo.pet.exceptions.TaskNotFoundException;
import my.todo.pet.models.Task;
import my.todo.pet.models.User;
import my.todo.pet.repositories.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

import static org.springframework.data.domain.ExampleMatcher.GenericPropertyMatchers.contains;

@Service
@Transactional
public class TaskService {
    private final TaskRepository taskRepository;

    @Autowired
    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    public Task findById(long id) {
        return taskRepository.findById(id)
                .orElseThrow(() -> new TaskNotFoundException(String.format("task by id: %s not found", id)));
    }

    public List<Task> findByUser(User user) {
        return taskRepository.findByUserOrderByStatusAscCreateTimeDesc(user);
    }

    public List<Task> findAll() {
        return taskRepository.findAll();
    }

    public Task save(Task task) {
        return taskRepository.save(task);
    }

    public void delete(long id) {
        taskRepository.deleteById(id);
    }

    @SneakyThrows(PaginationException.class)
    public Page<Task> paginateWithSortSecond(Task task, int pageNumber, int taskCount, String fieldName, Sort.Direction direction) {
        Page<Task> tasks;
        ExampleMatcher matcher = ExampleMatcher
                .matchingAll()
                .withMatcher("name", contains().ignoreCase());
        try {
            Sort sort = Sort.by(new Sort.Order(direction, fieldName));
            tasks = taskRepository.findAll(Example.of(task, matcher), PageRequest.of(pageNumber, taskCount, sort));
        } catch (Exception e) {
            throw new PaginationException(e.getMessage());
        }
        return tasks;
    }
}
