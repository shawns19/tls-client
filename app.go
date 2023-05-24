package main

import (
	T "botbase/Internal/TaskManager"
	"context"
	"fmt"
	"sync"

	"github.com/wailsapp/wails/v2/pkg/runtime"
)

// App struct
type App struct {
	ctx context.Context
	tasks []T.Task
	tasksMu sync.Mutex
}

func NewApp() *App {
	return &App{}
}

func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
	// Handle events emitted from frontend
	runtime.EventsOn(ctx, "ping", func(data ...interface{}) {
		runtime.LogPrint(ctx, fmt.Sprintf("%v", data))
		runtime.EventsEmit(ctx, "pong", "responding with pong from Go")
	})
	runtime.EventsOn(ctx, "startTask", func(data ...interface{}) {
		fmt.Println(fmt.Sprintf("tasks are %v",a.tasks))
		taskData, ok := data[0].(map[string]interface{})
		if !ok {
			return
		}

		task := T.Task{
			ID:      taskData["ID"].(string),
			Method:  taskData["Method"].(string),
			Payload: taskData["Payload"].(string),
			Status:  taskData["Status"].(string),
		}
		for _, t := range a.tasks {
			if t.ID == task.ID {
				return
			}
		}

		// Create cancel task functionality and pass to task
		taskCtx, cancel := context.WithCancel(context.Background())
		task.Ctx = taskCtx
		task.Cancel = cancel
		a.tasks = append(a.tasks,task)
		T.RunTask(a.ctx, task,&a.tasks)

	})
	runtime.EventsOn(ctx, "stopTask",func(data...interface{}) {
		taskData, ok := data[0].(map[string]interface{})
		if !ok {
			return
		}
		taskID := taskData["ID"].(string)
		a.tasksMu.Lock()
		defer a.tasksMu.Unlock()
		for i := range a.tasks {
			if a.tasks[i].ID == taskID {
				task := a.tasks[i]
				fmt.Println(fmt.Sprintf("stopping task %v", task))
				task.Status = "STOPPED"
				runtime.EventsEmit(ctx, "taskUpdate", task)

				task.Cancel()
				a.tasks = append(a.tasks[:i], a.tasks[i+1:]...)
				return
			}
		}
	})

}

func (b *App) beforeClose(ctx context.Context) (prevent bool) {
	dialog, err := runtime.MessageDialog(ctx, runtime.MessageDialogOptions{
		Type:    runtime.QuestionDialog,
		Title:   "Quit?",
		Message: "Are you sure you want to quit?",
	})

	if err != nil {
		return false
	}
	runtime.EventsOffAll(ctx)

	return dialog != "Yes"
}
