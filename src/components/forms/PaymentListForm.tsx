"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFormContext } from "react-hook-form";
import { Dispatch, SetStateAction, useEffect, useState, useMemo } from "react";
import { z } from "zod";
import InputField from "../InputField";
import { createStudentPayment, selectPayment, selectPaymentsForStudent, updateStudentPayment } from "@/lib/action";
import DropdownField from "../DropdownField";
import { StudentPaymentSchema, studentPaymentSchema } from "@/lib/formValidationSchema";
import { useRouter } from "next/navigation";




const PaymentListForm = ({
  handleClose,
  type,
  studentId,
  id
}: {
  handleClose: (value: boolean) => void;
  type: "create" | "update" | "delete";
  studentId?: string;
  id?: string;
}) => {
  const [status, setStatus] = useState<{ success: boolean; error: boolean }>({
    success: false,
    error: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<StudentPaymentSchema>({
    resolver: zodResolver(studentPaymentSchema),
    defaultValues: useMemo(() => ({
      student_id: studentId || "",
      subject_id: "",
      payment_date: new Date(),
      amount: "",
      month_id: "",
      payment_id: id
    }), [studentId, id])
  });

  const { register, handleSubmit, setValue, formState: { errors } } = form;

  useEffect(() => {
    const loadPaymentData = async () => {
      if (!id || type !== "update") return;
      setIsLoading(true);
      try {
        const data = await selectPayment(id);
        if (data) {
          setValue("payment_id", data.payment_id);
          setValue("student_id", data.student_id);
          setValue("subject_id", data.subject_id);
          setValue("payment_date", new Date(data.payment_date));
          setValue("amount", data.amount.toString());
          setValue("month_id", data.month_id);
        }
      } catch (error) {
        console.error('Error loading payment data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadPaymentData();
  }, [id, type, setValue]);

  const onSubmit = handleSubmit(async (formData) => {

    const fullData = {
        ...formData,
        student_id: formData.student_id,
        subject_id: formData.subject_id,
        payment_date: formData.payment_date,
        amount: formData.amount,
        month_id: formData.month_id,
      };

    try {
      let response;
      if (type === "create") {
        // Implement create action for adding a new payment
        // response = await createStudentPayment(formData);
       
        console.log(fullData);
        response = await createStudentPayment(fullData);
      } else {
        // Implement update action for changing payment details
        // response = await updateStudentPayment(formData);
        console.log(fullData);
        response = await updateStudentPayment(fullData);
      }
      
      
      if (response.success) {
        setStatus({ success: true, error: false});
        handleClose(false);
      } else {
        alert(`${type} action cannot be finished!!`)
        setStatus({ success: false, error: true});
      }
    } catch (error) {
      console.error("Error in payment form submission:", error);
      setStatus({ success: false, error: true });
    }
  });

  useEffect(() => {
    if (status.success) {
      handleClose(false);
      router.refresh();
    }
  }, [status, handleClose, router]);

  return (
    <div className="relative">
      {isLoading && (
        <div className="absolute inset-0 bg-white bg-opacity-60 z-10 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        {type === "create" ? (
            <>
            <h1 className="text-xl font-semibold">Add New Payment</h1>

            <DropdownField
            label="Subject"
            name="subject_id"
            table="subjects"
            displayField="subject_name"
            gradeValue="grade_id"
            displayValue="subject_id"
            register={register}
            error={errors.subject_id}
          />

          <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Payment Date</label>
          <input
            type="datetime-local"
            {...register("payment_date", {
              setValueAs: (value) => value ? new Date(value) : undefined,
            })}
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            //defaultValue={new Date().toISOString().slice(0, 16)} // Optional: sets initial value to current datetime
          />
          {errors.payment_date?.message && (
            <p className="text-xs text-red-400">
              {errors.payment_date.message.toString()}
            </p>
          )}
        </div>

        <InputField
        label="Amount (MAD)"
        type="number"
        register={register}
        name="amount"
        error={errors.amount}
      />

        <DropdownField
            label="Month"
            name="month_id"
            table="months"
            displayField="month_id"
            displayValue="month_id"
            register={register}
            error={errors.month_id}
          />

          </>

        ) : (
            <>
            <h1 className="text-xl font-semibold">Update Payment</h1>

            
            <InputField
            label="Amount (MAD)"
            type="number"
            register={register}
            name="amount"
            error={errors.amount}
        />
        <DropdownField
            label="Month"
            name="month_id"
            table="months"
            displayField="month_id"
            displayValue="month_id"
            register={register}
            error={errors.month_id}
          />
      </>
        )}


        <button 
        type="submit" 
        className="bg-blue-400 text-white p-2 rounded-md hover:bg-blue-500 transition-colors"
      >
        {type === "create" ? "Add Payment" : "Update Payment"}
      </button>
      

      {status.error && (
        <p className="text-red-500">
          {type === "create"
            ? "Failed to add payment"
            : type === "update"
            ? "Failed to update payment"
            : "Failed to delete payment"}
        </p>
      )}

      
    </form>
    </div>
  );
};

export default PaymentListForm;