package taskmanager

import "context"

type Task struct {
	ID     string
	Method string
	Payload    string
	Status string
	Ctx context.Context `json:"-"`
	Cancel context.CancelFunc `json:"-"`
}
