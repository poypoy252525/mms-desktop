import PageContainer from "@/components/page-container";
import PageHeader from "@/components/page-header";
import StaffForm from "./StaffForm";
import SubmitButton from "./SubmitButton";

const page = () => {
  return (
    <PageContainer>
      <PageHeader>
        New staff
        <SubmitButton />
      </PageHeader>
      <StaffForm />
    </PageContainer>
  );
};

export default page;
