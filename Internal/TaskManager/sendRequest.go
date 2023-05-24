package taskmanager

import (
	"fmt"
	"net/http"
	"time"
)

func SendGet(task Task, setStatus chan Task) {
	defer task.Cancel()
	task.Status = "startingtask..."
	setStatus <- task
	time.Sleep(5 * time.Second)
	select {
    case <-task.Ctx.Done():
        return
    default:
    }
	status2 := &task.Status
	*status2 = fmt.Sprintf("Sending get request to %v", task.Payload)
	setStatus <- task
	resp, err := http.Get(task.Payload)
	if err != nil {
		errStatus := &task.Status
		*errStatus = "Request Error!"
		setStatus <- task
		return
	}
	defer resp.Body.Close()

	statusComplete := &task.Status
	*statusComplete = fmt.Sprintf("Status: %v", resp.StatusCode)
	setStatus <- task
}
