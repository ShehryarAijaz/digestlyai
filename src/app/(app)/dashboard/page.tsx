"use client"

import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner"
import { MdModeEdit } from "react-icons/md";
import EmailPreview from "@/components/EmailPreview";
import Schedule from "@/components/Schedule";
import TopTweets from "@/components/TopTweets";

export default function Home() {
  const { data: session } = useSession();

  const [accounts, setAccounts] = useState<{ [key: string]: string }>({
    account1: "",
    account2: "",
    account3: "",
  });
  const [frequency, setFrequency] = useState<string>("Daily");
  const [topTweets, setTopTweets] = useState<boolean>(false);

  const [addButtonClicked, setAddButtonClicked] = useState<boolean>(false);

  // Helper to update a specific account value
  const handleAccountInputChange = (account: string, value: string) => {
    setAccounts((prev) => ({
      ...prev,
      [account]: value,
    }));
  };

  const handleSavePreferences = async () => {
    console.log("Saving preferences...", accounts, frequency, topTweets);
    // Add your save logic here
  };

  const handleAddButtonClick = () => {
    if (Object.values(accounts).includes("")) {
      console.log("button clicked..");
      setAddButtonClicked(false);
      toast.error("Please add an account before clicking add");
    } else {
      setAddButtonClicked(true);
    }
  };

  const handleEditButtonClick = () => {
    setAddButtonClicked(false);
  }

  console.log(accounts)

  return (
    <div className="flex flex-col justify-center max-w-4xl mx-auto px-6 py-10">
      <div className="border-b pb-2">
        <h1 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">Hey {session?.user?.name}, ready to setup your email digest?</h1>
        <p className="text-muted-foreground text-xl">Pick your accounts, choose schedule, and we&apos;ll handle the rest!</p>
      </div>

      <div className="mt-8 border-b pb-5">
        <h3 className="text-2xl font-semibold tracking-tight">Choose X Accounts</h3>
        <p className="leading-7 [&:not(:first-child)]:mt-1 text-muted-foreground">Add up to 3 accounts. Names should be accurate</p>
        <div className="flex flex-col gap-2 mt-2 w-full max-w-sm">
          <div className="flex items-center gap-2">
            <Input
              onChange={(e) => handleAccountInputChange("account1", e.target.value)}
              type="text"
              placeholder="Account 1"
              value={accounts.account1}
            />
          </div>
          <div className="flex items-center gap-2">
            <Input
              onChange={(e) => handleAccountInputChange("account2", e.target.value)}
              type="text"
              placeholder="Account 2"
              value={accounts.account2}
            />
          </div>
          <div className="flex items-center gap-2">
            <Input
              onChange={(e) => handleAccountInputChange("account3", e.target.value)}
              type="text"
              placeholder="Account 3"
              value={accounts.account3}
            />
          </div>
        </div>
        <div className="mt-3 flex items-center gap-2">
          <Button
            variant="default"
            className="h-10"
            onClick={handleAddButtonClick}
            disabled={addButtonClicked}
          >
            {addButtonClicked ? "Accounts Added" : "Save Accounts"}
          </Button>
          {addButtonClicked && (
            <Button
              variant="outline"
              className="h-10 flex items-center justify-center px-3"
              onClick={handleEditButtonClick}
            >
              <MdModeEdit />
            </Button>
          )}
        </div>
      </div>

      <Schedule frequency={frequency} setFrequency={setFrequency} />

      <EmailPreview />

      <TopTweets topTweets={topTweets} setTopTweets={setTopTweets} />

    </div>
  );
}
