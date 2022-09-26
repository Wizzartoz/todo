package my.todo.pet.services;

import my.todo.pet.controllers.TaskController;
import my.todo.pet.models.Task;
import my.todo.pet.models.TaskModel;
import org.springframework.beans.BeanUtils;
import org.springframework.hateoas.server.mvc.RepresentationModelAssemblerSupport;
import org.springframework.stereotype.Component;

@Component
public class TaskModelAssembler extends RepresentationModelAssemblerSupport<Task, TaskModel> {

    public TaskModelAssembler() {
        super(TaskController.class, TaskModel.class);
    }

    @Override
    public TaskModel toModel(Task entity) {
        TaskModel taskModel = new TaskModel();
        BeanUtils.copyProperties(entity, taskModel);
        return taskModel;
    }
}
