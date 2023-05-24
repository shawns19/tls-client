package taskmanager

import (
	"context"
	"fmt"

	runtime "github.com/wailsapp/wails/v2/pkg/runtime"
)

func RunTask(ctx context.Context,task Task, runningTasks *[]Task) {

	statusChan := make(chan Task)
	defer func() {
        if r := recover(); r != nil {
            task.Status = "Internal Error"
            runtime.LogPrint(ctx, fmt.Sprintf("task panicked: %v", r))
        }
    }()
	switch task.Method {
    case "sendRequest":
        go SendGet(task, statusChan)
    default:
        runtime.LogPrint(ctx, "unsupported task method")
        return
    }
	*runningTasks = append(*runningTasks,task)
	for {
		select {
		case <- task.Ctx.Done():

			tasksToRemove := []int{}
			for i, t := range *runningTasks {
				if t.ID == task.ID {
					tasksToRemove = append(tasksToRemove, i)
				}
			}

			for i := len(tasksToRemove) - 1; i >= 0; i-- {
				index := tasksToRemove[i]
				*runningTasks = append((*runningTasks)[:index], (*runningTasks)[index+1:]...)
			}
			return
		case status := <-statusChan:
			task.Status = status.Status
			runtime.EventsEmit(ctx, "taskUpdate", task)
		}
	}
}
