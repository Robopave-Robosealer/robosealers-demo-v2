import { Helmet } from "react-helmet";
import MainTitle from "../../design-system/components/MainTitle";
import { Button, Flex, Menu } from "@mantine/core";
import { useState } from "react";
import TopicMessages from "../components/TopicMessages";
import { IconChevronDown } from "@tabler/icons-react";

export default function RawData() {
  const rawData = [
    {
      id: 1,
      topicName: "Light System",
      messages: [1],
    },
    {
      id: 2,
      topicName: "Sealant System",
      messages: [1, 2, 3, 4],
    },
    {
      id: 3,
      topicName: "Blower System",
      messages: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    },
    {
      id: 4,
      topicName: "Battery System",
      messages: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    },
    {
      id: 5,
      topicName: "Motor System",
      messages: [1, 2, 3, 4, 10, 11],
    },
  ];
  const [activeTopic, setActiveTopic] = useState(rawData[0]);
  return (
    <>
      <Helmet>
        <title>Raw Data</title>
      </Helmet>
      <Flex justify="space-between">
        <MainTitle title={activeTopic.topicName} />
        <Menu shadow="md" width={200} withArrow>
          <Menu.Target>
            <Button rightSection={<IconChevronDown size="1.2rem" />}>
              All Topics
            </Button>
          </Menu.Target>
          <Menu.Dropdown>
            {rawData.map((topic) => {
              return (
                <Menu.Item onClick={() => setActiveTopic(topic)} key={topic.id}>
                  {topic.topicName}
                </Menu.Item>
              );
            })}
          </Menu.Dropdown>
        </Menu>
      </Flex>
      <TopicMessages topic={activeTopic} />
    </>
  );
}
