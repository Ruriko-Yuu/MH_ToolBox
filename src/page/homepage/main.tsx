import { FC, useState } from "react";
import SkillTagSelect from "../../components/SkillTagSelect/index";
import EquipmentSelect from "../../components/EquipmentSelect/index";
import styled from "@emotion/styled"
const HomepageContent = styled('div')`
  li {
    margin: 10px 0;
  }
`
const Homepage: FC<{}> = ({}) => {
  const [skillSelectVal, setSkillSelectVal] = useState<(number | string)[]>([]);
  return (
    <HomepageContent>
      <div className={"flex-lc"}>
        <p style={{ minWidth: "5em" }}>快速配装：</p>
        <SkillTagSelect
          skillSelectVal={skillSelectVal}
          setSkillSelectVal={setSkillSelectVal}
        />
      </div>
      <ul>
        <li>
          <EquipmentSelect type="head" />
        </li>
        <li>
          <EquipmentSelect type="body" />
        </li>
        <li>
          <EquipmentSelect type="hand" />
        </li>
        <li>
          <EquipmentSelect type="skirt" />
        </li>
        <li>
          <EquipmentSelect type="foot" />
        </li>
      </ul>
    </HomepageContent>
  );
};

export default Homepage;
