import { FC, memo, useState } from "react";
import { CheckOutlined } from "@ant-design/icons";
import { Button, Modal, Input, Tooltip, Tag, Collapse, Select } from "antd";
import styled from "@emotion/styled";
import SkillTagSelect from "../../components/SkillTagSelect/index";
import equipment from "./equipment.json";
const { Panel } = Collapse;
const EquipmentSelectHTML = styled.div`
  padding: 5px;
  border: 1px solid #ddd;
`;

const EquipmentUL = styled.ul`
  overflow-y: auto;
  overflow-x: hidden;
  max-height: 225px;
  background-color: #f9f9f9;
  li {
    box-sizing: border-box;
    width: 100%;
    padding: 6px 15px;
    cursor: pointer;
    &.active {
      color: #6cf;
    }
    &:hover {
      background-color: #eef;
      color: #33f;
    }
  }
`;
interface defEquipmentType {
  rank: number;
  name: string;
  skill: {
    key: number;
    value: number;
  }[];
  hole: number;
  def: number;
  eDef: {
    fire: number;
    ice: number;
    water: number;
    electric: number;
    gragon: number;
  };
}
const EquipmentSelect: FC<{
  type: "head" | "body" | "hand" | "skirt" | "foot";
}> = memo(({ type }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [skillQuickSearchVal, setSkillQuickSearchVal] = useState<
    (number | string)[]
  >([]);
  const [nameSearchVal, setNameSearchVal] = useState("");
  const [holeSearchVal, setHoleSearchVal] = useState();
  const [equipmentSelectVal, setEquipmentSelectVal] =
    useState<defEquipmentType>();
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const cbEquipmentDetailHTML = (e: defEquipmentType) => {
    return (
      <>
        <p>name: {e.name}</p>
        <p>
          skill:
          {e.skill.map((ele, idx) => (
            <Tag color="#3bf" key={idx}>{`${ele.key}:${ele.value}`}</Tag>
          ))}
        </p>
        <p>
          hole:{" "}
          {{ 0: [], 1: [{}], 2: [{}, {}], 3: [{}, {}, {}] }[e.hole]?.map(
            (ele, idx) => (
              <span key={idx}>○</span>
            )
          )}
        </p>
        <p>def: {e.def}</p>
        <p>fireDef: {e.eDef.fire}</p>
        <p>iceDef: {e.eDef.ice}</p>
        <p>waterDef: {e.eDef.water}</p>
        <p>electricDef: {e.eDef.electric}</p>
        <p>gragonDef: {e.eDef.gragon}</p>
      </>
    );
  };

  return (
    <EquipmentSelectHTML>
      <Button size="small" onClick={showModal}>
        请选择{type}
      </Button>
      <Modal
        title={`${type}选择`}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        className={"thin-scroll-bar"}
      >
        <div className={"flex-lc"}>
          <p style={{ minWidth: "5em" }}>技能搜索：</p>
          <SkillTagSelect
            skillSelectVal={skillQuickSearchVal}
            setSkillSelectVal={setSkillQuickSearchVal}
          />
        </div>
        <div className={"flex-lc"} style={{ marginTop: 10 }}>
          <p style={{ minWidth: "5em" }}>名称搜索：</p>
          <Input
            placeholder=""
            value={nameSearchVal}
            onChange={(e) => {
              setNameSearchVal(e.target.value);
            }}
          />
        </div>
        <Collapse
          size={"small"}
          defaultActiveKey={[]}
          onChange={() => {}}
          style={{ marginTop: 10 }}
        >
          <Panel header="其他搜索" key="1">
            <div className={"flex-lc"}>
              <p style={{ minWidth: "5em" }}>孔数搜索：</p>
              <Select
                style={{ width: 120 }}
                onChange={(e) => {
                  setHoleSearchVal(e);
                }}
                value={holeSearchVal}
                allowClear
                options={[
                  { value: 0, label: "---" },
                  { value: 1, label: "○--" },
                  { value: 2, label: "○○-" },
                  { value: 3, label: "○○○" },
                ]}
              />
            </div>
          </Panel>
        </Collapse>
        <EquipmentUL>
          {equipment[type]
            .filter((ele) => ele.name.indexOf(nameSearchVal) !== -1)
            .filter((element) => {
              return skillQuickSearchVal.every((ele) =>
                element.skill.some((e) => e.key === ele)
              );
            })
            .filter(
              (ele) => ele.hole === holeSearchVal || holeSearchVal === void 0
            )
            .map((ele, idx) => (
              <Tooltip
                key={idx}
                placement="topLeft"
                title={cbEquipmentDetailHTML(ele)}
              >
                <li
                  onClick={() => {
                    setEquipmentSelectVal(ele);
                  }}
                  className={`flex-sc ${
                    equipmentSelectVal !== void 0 &&
                    equipmentSelectVal.name === ele.name
                      ? "active"
                      : ""
                  }`}
                >
                  {nameSearchVal === "" ? (
                    ele.name
                  ) : (
                    <>
                      {ele.name.split(nameSearchVal)[0]}
                      <span style={{ color: "blue" }}>{nameSearchVal}</span>
                      {ele.name
                        .split(nameSearchVal)
                        .slice(1)
                        .join(nameSearchVal)}
                    </>
                  )}
                  <i>
                    <CheckOutlined />
                  </i>
                </li>
              </Tooltip>
            ))}
        </EquipmentUL>
      </Modal>
    </EquipmentSelectHTML>
  );
});
export default EquipmentSelect;
