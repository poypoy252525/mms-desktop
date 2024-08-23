import PageHeading from "@/app/_components/PageHeading";
import PageWrapper from "@/app/_components/PageWrapper";
import DeathRecordForm from "../_components/DeathRecordForm";
import BurialPickerCard from "../_components/BurialPickerCard";

const CreateDeathRecord = () => {
  return (
    <PageWrapper>
      <PageHeading>New Record</PageHeading>
      <DeathRecordForm />
    </PageWrapper>
  );
};

export default CreateDeathRecord;
