package my.todo.pet.repositories;

import my.todo.pet.models.Task;
import my.todo.pet.models.Topic;
import my.todo.pet.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.validation.constraints.NotEmpty;
import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByUserOrderByStatusAscCreateTimeDesc(User user);

}
