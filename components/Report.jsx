import { useState } from "react";
import { Modal, Button, Group, Text } from "@mantine/core";
import { CheckboxGroup, Checkbox } from "@mantine/core";
import { InputWrapper, Input, Space } from "@mantine/core";
import { GoReport } from "react-icons/go";
import { useNotifications } from "@mantine/notifications";
import { CheckIcon } from "@modulz/radix-icons";

export default function Report() {
  const [opened, setOpened] = useState(false);
  const [checked, setChecked] = useState(true);
  const notifications = useNotifications();

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Report content!"
      >
        <CheckboxGroup
          color="red"
          orientation="vertical"
          label="Report reason:"
          required
        >
          <Checkbox value="value1" label="Game update" />
          <Checkbox value="value2" label="Comic / Animation Update" />
          <Checkbox value="value3" label="Advertising / Spam" />
          <Checkbox value="value4" label="Inappropriate Behaviour" />
          <Checkbox
            value="value5"
            label="Other"
            onClick={() => setChecked(!checked)}
          />
        </CheckboxGroup>
        <Space h="sm" />
        <InputWrapper id="input-demo" label="More information:">
          <Input id="input-demo" disabled={checked} />
        </InputWrapper>
        <Space h="sm" />
        <Button
          variant="gradient"
          gradient={{ from: "orange", to: "red" }}
          onClick={() => {
            const id = notifications.showNotification({
              loading: true,
              title: "Saving your report",
              message: "This will take some time...",
              autoClose: false,
              disallowClose: true,
            });

            setTimeout(() => {
              notifications.updateNotification(id, {
                id,
                color: "teal",
                title: "Thanks for your report!",
                message: "We will look into this and get back to you soon",
                icon: <CheckIcon />,
                autoClose: 3000,
              });
            }, 3000);
            setOpened(false);
          }}
        >
          <Group spacing={5}>
            <GoReport />
            Report
          </Group>
        </Button>
      </Modal>
      <Group position="center">
        <Button
          variant="gradient"
          gradient={{ from: "orange", to: "red" }}
          onClick={() => setOpened(true)}
        >
          <Group spacing={5}>
            <GoReport />
            Report
          </Group>
        </Button>
      </Group>
    </>
  );
}
