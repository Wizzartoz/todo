package my.todo.pet.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(
        name = "user",
        schema = "Public",
        uniqueConstraints = {@UniqueConstraint(columnNames = "login")})
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotEmpty
    @Column(name = "login")
    private String login;

    @NotEmpty
    @Column(name = "password")
    private String password;

    @Email
    @Column(name = "email")
    private String email;

    @Column(name = "role")
    private String role;

    @OneToMany(mappedBy = "user")
    private List<Task> tasks;

}
