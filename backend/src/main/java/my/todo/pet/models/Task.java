package my.todo.pet.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@Entity
@Builder
@AllArgsConstructor
@Table(name = "task")
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "create_time")
    @CreationTimestamp
    private LocalDateTime createTime;

    @NotEmpty(message = "name cannot be empty")
    @Size(max = 20 , message = "maximum length cannot exceed 20 characters")
    @Column(name = "name")
    private String name;

    @Size(max = 200 , message = "maximum length cannot exceed 200 characters")
    @Column(name = "description")
    private String description;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Type(type = "my.todo.pet.models.EnumTypePostgreSQL")
    @Column(name = "status")
    private Status status;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Type(type = "my.todo.pet.models.EnumTypePostgreSQL")
    @Column(name = "topic")
    private Topic topic;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "id_user",referencedColumnName = "id")
    private User user;
}
