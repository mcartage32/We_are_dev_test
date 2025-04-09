import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import { useField } from "formik";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import { usePropietyListQuery, useStatusListQuery } from "../api/ApiHooks";

const TaskForm = () => {
  const { data: statusList, isLoading: isLoadingStatus } = useStatusListQuery();
  const { data: priorityList, isLoading: isLoadingPriority } =
    usePropietyListQuery();
  const [titleField, titleMeta] = useField("title");
  const [descriptionField, descriptionMeta] = useField("description");
  const [dueDateField, dueDateMeta, dueDateHelpers] = useField("dueDate");
  const [statusIdField, , statusIdHelpers] = useField("statusId");
  const [priorityIdField, , priorityIdHelpers] = useField("priorityId");

  if (isLoadingStatus || isLoadingPriority) return <CircularProgress />;

  return (
    <>
      <TextField
        {...titleField}
        label="Título"
        error={Boolean(titleMeta.touched && titleMeta.error)}
        helperText={titleMeta.touched && titleMeta.error ? titleMeta.error : ""}
        required
        fullWidth
      />
      <TextField
        {...descriptionField}
        label="Descripción"
        error={Boolean(descriptionMeta.touched && descriptionMeta.error)}
        helperText={
          descriptionMeta.touched && descriptionMeta.error
            ? descriptionMeta.error
            : ""
        }
        multiline
        rows={5}
        required
        fullWidth
      />
      <DatePicker
        label="Fecha de vencimiento"
        value={dueDateField.value ? dayjs(dueDateField.value) : null}
        onChange={(newValue: Dayjs | null) => {
          dueDateHelpers.setValue(newValue ? newValue.toISOString() : "");
        }}
        slotProps={{
          textField: {
            error: Boolean(dueDateMeta.touched && dueDateMeta.error),
            helperText:
              dueDateMeta.touched && dueDateMeta.error ? dueDateMeta.error : "",
            fullWidth: true,
            required: true,
          },
        }}
        minDate={dayjs()}
      />
      <Autocomplete
        fullWidth
        id="status"
        options={statusList || []}
        value={
          statusList?.find((status) => status.id === statusIdField.value) ||
          null
        }
        getOptionLabel={(option) => option?.name}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        onChange={(_event, value) => {
          statusIdHelpers.setValue(value ? value.id : null);
        }}
        renderInput={(params) => (
          <TextField {...params} label="Estado" required />
        )}
      />
      <Autocomplete
        fullWidth
        id="priority"
        options={priorityList || []}
        value={
          priorityList?.find(
            (priority) => priority.id === priorityIdField.value
          ) || null
        }
        getOptionLabel={(option) => option?.name}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        onChange={(_event, value) => {
          priorityIdHelpers.setValue(value ? value.id : null);
        }}
        renderInput={(params) => (
          <TextField {...params} label="Prioridad" required />
        )}
      />
    </>
  );
};

export default TaskForm;
