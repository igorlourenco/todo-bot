export const HELP = 'HELP'
export const HELP_EXPLANATION = 'lista todos os comandos disponíveis'

export const TASKS = 'TAREFAS'
export const NEW_TASK = 'NOVA TAREFA'
export const SIGNIN = 'CADASTRAR'
export const NEW_TASK_EXPLANATION = `cadastra nova tarefa.\n     • _TAREFA [descricao da tarefa]_.\n     • exemplo: *TAREFA ir fazer algo muito legal*`
export const FINISH_TASK = 'CONCLUIDA'
export const FINISH_TASK2 = 'CONCLUÍDA'
export const FINISHED_TASKS = 'TAREFAS CONCLUIDAS'
export const FINISHED_TASKS2 = 'TAREFAS CONCLUÍDAS'
export const FINISH_TASK_EXPLANATION = `marca a tarefa como concluída.\n     • _CONCLUIDA [número da tarefa na lista]_.\n     • exemplo: *CONCLUIDA 1*`

export const TASKS_EXPLANATION = 'lista suas atividades'

export const HELP_CONTENT = `
\`\`\`📌 Comandos disponíveis\`\`\` \n\n
*${TASKS}*: ${TASKS_EXPLANATION} \n
*${NEW_TASK}*: ${NEW_TASK_EXPLANATION} \n
*${FINISH_TASK}*: ${FINISH_TASK_EXPLANATION} \n
*${HELP}*: ${HELP_EXPLANATION} \n
`