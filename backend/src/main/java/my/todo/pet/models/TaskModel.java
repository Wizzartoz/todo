package my.todo.pet.models;

import lombok.*;
import org.springframework.hateoas.RepresentationModel;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TaskModel extends RepresentationModel<TaskModel> {

    private Long id;

    private LocalDateTime createTime;

    private String name;

    private String description;

    private Status status;

    private Topic topic;
}
