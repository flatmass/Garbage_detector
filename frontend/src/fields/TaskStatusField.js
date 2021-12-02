import * as React from "react";
import { useRecordContext } from 'react-admin';

const TaskStatusField = (props) => {
    const { source } = props;
    const record = useRecordContext(props);
    return record ? (
        <span>
            {record[source] === true ? 'Завершена' : 'Открыта'}
        </span>
    ) : null;
}

export default TaskStatusField;