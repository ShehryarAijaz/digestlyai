"use client"

import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { toast } from "sonner"
import { MdModeEdit } from "react-icons/md";
import EmailPreview from "@/components/EmailPreview";
import Schedule from "@/components/Schedule";
import Settings from "@/components/Settings";
import Footer from "@/components/Footer";
import axios from "axios";

export default function Home() {
  const { data: session } = useSession();

  const [accounts, setAccounts] = useState<{ [key: string]: string }>({
    account1: "",
    account2: "",
    account3: "",
  });
  const [frequency, setFrequency] = useState<string>("Daily");
  const [topTweets, setTopTweets] = useState<boolean>(false);
  const [aiSummaries, setAiSummaries] = useState<boolean>(false);
  const [addButtonClicked, setAddButtonClicked] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const response = await axios.get('/api/accounts')
      if (response.data.success) {
        setAccounts({
          account1: response.data.user.socialHandles.accounts[0],
          account2: response.data.user.socialHandles.accounts[1],
          account3: response.data.user.socialHandles.accounts[2],
        })
        setFrequency(response.data.user.frequency.charAt(0).toUpperCase() + response.data.user.frequency.slice(1))
        setAddButtonClicked(true)
      } else {
        toast.error(response.data.message)
      }
    }
    fetchUserDetails()
  }, [])

  // Helper to update a specific account value
  const handleAccountInputChange = (account: string, value: string) => {
    setAccounts((prev) => ({
      ...prev,
      [account]: value,
    }));
  };

  const handleSavePreferences = async () => {
    // Feature to be added later
  };

  const handleAddButtonClick = async () => {
    if (Object.values(accounts).includes("")) {
      setAddButtonClicked(false);
      toast.error("Please add all accounts before clicking add");
    } else {
      setAddButtonClicked(true);
      setIsLoading(true)

      try {
        const response = await axios.post(`/api/accounts`, {
          account1: accounts.account1,
          account2: accounts.account2,
          account3: accounts.account3
        })
        if (response.data.success) {
          toast.success(response.data.message)
        } else {
          toast.error(response.data.message)
        }
      } catch (error) {
        toast.error("Error adding accounts")
      } finally {
        setIsLoading(false)
      }
    }
  };

  const handleEditButtonClick = () => {
    setAddButtonClicked(false);
  }

  return (
    <div className="flex flex-col justify-center max-w-4xl mx-auto px-6 py-10">
      <div className="border-b pb-2">
        <h1 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">Hey {session?.user ? session?.user?.name : "Anonymous"}, ready to setup your email digest?</h1>
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
              disabled={addButtonClicked}
            />
          </div>
          <div className="flex items-center gap-2">
            <Input
              onChange={(e) => handleAccountInputChange("account2", e.target.value)}
              type="text"
              placeholder="Account 2"
              value={accounts.account2}
              disabled={addButtonClicked}
            />
          </div>
          <div className="flex items-center gap-2">
            <Input
              onChange={(e) => handleAccountInputChange("account3", e.target.value)}
              type="text"
              placeholder="Account 3"
              value={accounts.account3}
              disabled={addButtonClicked}
            />
          </div>
        </div>
        <div className="mt-3 flex items-center gap-2">
          <Button
            variant="default"
            className="h-10 cursor-pointer"
            onClick={handleAddButtonClick}
            disabled={addButtonClicked}
          >
            {addButtonClicked ? "Accounts Added" : "Save Accounts"}
          </Button>
          {addButtonClicked && (
            <Button
              variant="outline"
              className="h-10 flex items-center justify-center px-3 cursor-pointer"
              onClick={handleEditButtonClick}
            >
              <MdModeEdit />
            </Button>
          )}
        </div>
      </div>

      <Schedule frequency={frequency} setFrequency={setFrequency} />

      <EmailPreview accounts={accounts} />

      <Settings topTweets={topTweets} setTopTweets={setTopTweets} aiSummaries={aiSummaries} setAiSummaries={setAiSummaries} disabled={true} />

      <Footer />
    </div>
  );
}
