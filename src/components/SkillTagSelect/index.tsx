import React, { useState, memo } from "react";
import { Select, Space, Tag, Tooltip } from "antd";
import confJson from "./conf.json";
import AtkSvg from "../../assets/svg/atk.svg";
import DefSvg from "../../assets/svg/def.svg";
import OtherSvg from "../../assets/svg/other.svg";

const options = confJson.skillList;
const { Option } = Select;
interface skillType {
  name: string;
  key: number;
  type: string;
  teamMark: string;
  desc: string;
}
const tagRender = (props: any) => {
  const { label, value, closable, onClose } = props;
  const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };
  return (
    <Tag
      color={
        {
          atk: "#f50",
          def: "#8d6",
          other: "#3bf",
        }[options.find((ele) => ele.key === props.value)!.type]
      }
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
      style={{ marginRight: 3 }}
      className={"x-flex"}
    >
      {label}
    </Tag>
  );
};

const SkillTagSelect: React.FC<{
  skillSelectVal: (number | string)[];
  setSkillSelectVal: React.Dispatch<React.SetStateAction<(string | number)[]>>;
}> = memo(({ skillSelectVal, setSkillSelectVal }) => {
  /** 保存技能组 */
  const handleChange = (val: (number | string)[]) => {
    setSkillSelectVal(val);
  };
  /** 同组技能置灰 */
  const optionDisabled = (val: skillType): boolean => {
    const skillSelectOptions = skillSelectVal.map((ele) => {
      return options.find((e) => e.key === ele);
    });
    return skillSelectOptions.some(
      (ele) => ele && ele.key !== val.key && ele.teamMark === val.teamMark
    );
  };
  return (
    <Space style={{ width: "100%" }} direction="vertical">
      <Select
        mode="multiple"
        allowClear
        tagRender={tagRender}
        style={{ width: "100%" }}
        placeholder="Please select Skill"
        defaultValue={[]}
        value={skillSelectVal}
        onChange={handleChange}
      >
        {options.map((ele) => (
          <Option value={ele.key} key={ele.key} disabled={optionDisabled(ele)}>
            <Tooltip placement="top" title={ele.desc}>
              <p className={"flex-lc"} style={{ display: "inline-flex" }}>
                <i style={{ width: "14px", height: "14px" }}>
                  <img
                    style={{ width: "14px", height: "14px" }}
                    src={
                      {
                        atk: AtkSvg,
                        def: DefSvg,
                        other: OtherSvg,
                      }[ele.type]
                    }
                    alt=""
                  />
                </i>
                {ele.name}
              </p>
            </Tooltip>
          </Option>
        ))}
      </Select>
    </Space>
  );
});

export default SkillTagSelect;
