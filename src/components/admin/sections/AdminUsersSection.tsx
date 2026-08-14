"use client";

import React, { useState, useMemo } from "react";
import {
  Search,
  Filter,
  UserPlus,
  MoreVertical,
  Edit,
  Trash2,
  Ban,
  CheckCircle,
  Award,
  Zap,
  Coins,
  Flame,
  Download,
  ChevronLeft,
  ChevronRight,
  Eye,
  Shield,
} from "lucide-react";
import { ADMIN_USERS, AdminUser } from "@/data/adminData";

export default function AdminUsersSection() {
  const [usersList, setUsersList] = useState<AdminUser[]>(ADMIN_USERS);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);

  // Filtered users
  const filteredUsers = useMemo(() => {
    return usersList.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesRole = roleFilter === "All" || user.role === roleFilter;
      const matchesStatus = statusFilter === "All" || user.status === statusFilter;

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [usersList, searchQuery, roleFilter, statusFilter]);

  // Actions
  const handleToggleStatus = (userId: string) => {
    setUsersList((prev) =>
      prev.map((u) =>
        u.id === userId
          ? { ...u, status: u.status === "Active" ? "Suspended" : "Active" }
          : u
      )
    );
  };

  const handleDeleteUser = (userId: string) => {
    if (confirm("Are you sure you want to delete this user?")) {
      setUsersList((prev) => prev.filter((u) => u.id !== userId));
    }
  };

  return (
    <div className="space-y-6 select-none">
      {/* HEADER & TOP CONTROLS */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-[#1E1B2E] tracking-tight">
            User <span className="text-[#8B7FE8]">Management</span>
          </h2>
          <p className="text-xs text-[#6B6785] font-medium">
            Manage permissions, credentials, subscriptions, and active accounts.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            className="px-4 py-2 rounded-2xl text-xs font-extrabold text-[#8B7FE8] bg-[#F5F2FF] border border-[#E8E3FF] hover:bg-[#8B7FE8] hover:text-white transition-all flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
          <button
            type="button"
            className="px-4 py-2 rounded-2xl text-xs font-extrabold text-white bg-[#8B7FE8] hover:bg-[#786BD6] shadow-soft-sm transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <UserPlus className="w-4 h-4" />
            <span>Add User</span>
          </button>
        </div>
      </div>

      {/* FILTER & SEARCH BAR */}
      <div className="bg-white rounded-3xl p-4 border border-[#E8E3FF] shadow-soft flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8B7FE8]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name or email..."
            className="w-full pl-10 pr-4 py-2 rounded-2xl bg-[#FCFBFF] border border-[#E8E3FF] text-xs font-semibold outline-none focus:border-[#8B7FE8]"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#6B6785]">
            <Filter className="w-3.5 h-3.5 text-[#8B7FE8]" />
            <span>Role:</span>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="bg-[#F5F2FF] border border-[#E8E3FF] text-[#1E1B2E] text-xs font-bold rounded-xl px-2.5 py-1.5 outline-none"
            >
              <option value="All">All Roles</option>
              <option value="Learner">Learner</option>
              <option value="Instructor">Instructor</option>
              <option value="Admin">Admin</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-bold text-[#6B6785]">
            <span>Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-[#F5F2FF] border border-[#E8E3FF] text-[#1E1B2E] text-xs font-bold rounded-xl px-2.5 py-1.5 outline-none"
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Suspended">Suspended</option>
            </select>
          </div>
        </div>
      </div>

      {/* USERS DATA TABLE */}
      <div className="bg-white rounded-3xl border border-[#E8E3FF] shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#F8F9FC] border-b border-[#E8E3FF] text-[#6B6785] font-extrabold uppercase text-[10px] tracking-wider">
                <th className="p-4">User</th>
                <th className="p-4">Role</th>
                <th className="p-4">Subscription</th>
                <th className="p-4">XP & Coins</th>
                <th className="p-4">Streak & Certs</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8E3FF]/60 font-medium text-[#1E1B2E]">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-[#F6F2FF]/40 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={user.avatarUrl}
                        alt={user.name}
                        className="w-9 h-9 rounded-2xl bg-[#F5F2FF] border border-[#E8E3FF] object-cover"
                      />
                      <div>
                        <span className="font-extrabold text-sm block">{user.name}</span>
                        <span className="text-[11px] text-[#6B6785]">{user.email}</span>
                      </div>
                    </div>
                  </td>

                  <td className="p-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-extrabold border ${
                        user.role === "Admin"
                          ? "bg-[#FFF0F5] text-[#C0336A] border-[#FFC9DE]"
                          : user.role === "Instructor"
                          ? "bg-[#F5F2FF] text-[#4B3FBF] border-[#C4BDFA]"
                          : "bg-[#E6F9F0] text-[#0E8566] border-[#9DD9C5]"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>

                  <td className="p-4">
                    <span className="font-bold">{user.subscription}</span>
                  </td>

                  <td className="p-4">
                    <div className="flex items-center gap-3 text-[11px] font-bold">
                      <span className="flex items-center gap-1 text-[#8B7FE8]">
                        <Zap className="w-3.5 h-3.5" />
                        {user.xp} XP
                      </span>
                      <span className="flex items-center gap-1 text-[#D97706]">
                        <Coins className="w-3.5 h-3.5" />
                        {user.coins}
                      </span>
                    </div>
                  </td>

                  <td className="p-4">
                    <div className="flex items-center gap-3 text-[11px] font-bold">
                      <span className="flex items-center gap-1 text-[#C0336A]">
                        <Flame className="w-3.5 h-3.5" />
                        {user.streak}d
                      </span>
                      <span className="flex items-center gap-1 text-[#0E8566]">
                        <Award className="w-3.5 h-3.5" />
                        {user.certificatesCount}
                      </span>
                    </div>
                  </td>

                  <td className="p-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        user.status === "Active"
                          ? "bg-[#E6F9F0] text-[#0E8566]"
                          : "bg-[#FFF0F5] text-[#C0336A]"
                      }`}
                    >
                      {user.status === "Active" ? "Active" : "Suspended"}
                    </span>
                  </td>

                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        type="button"
                        onClick={() => setSelectedUser(user)}
                        className="p-1.5 rounded-xl hover:bg-[#F5F2FF] text-[#8B7FE8] transition-colors"
                        title="View User Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleToggleStatus(user.id)}
                        className="p-1.5 rounded-xl hover:bg-[#FFF0F5] text-[#C0336A] transition-colors"
                        title={user.status === "Active" ? "Suspend User" : "Activate User"}
                      >
                        <Ban className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteUser(user.id)}
                        className="p-1.5 rounded-xl hover:bg-red-50 text-red-500 transition-colors"
                        title="Delete User"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* PAGINATION FOOTER */}
        <div className="p-4 border-t border-[#E8E3FF] flex items-center justify-between text-xs font-bold text-[#6B6785]">
          <span>Showing {filteredUsers.length} of {usersList.length} users</span>
          <div className="flex items-center gap-2">
            <button className="p-1.5 rounded-xl bg-[#F5F2FF] border border-[#E8E3FF] text-[#8B7FE8]">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span>Page 1 of 1</span>
            <button className="p-1.5 rounded-xl bg-[#F5F2FF] border border-[#E8E3FF] text-[#8B7FE8]">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* USER DETAIL MODAL */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1E1B2E]/40 backdrop-blur-md">
          <div className="bg-white border border-[#E8E3FF] rounded-3xl p-6 w-full max-w-md shadow-2xl relative">
            <button
              onClick={() => setSelectedUser(null)}
              className="absolute top-4 right-4 text-[#6B6785] hover:text-[#1E1B2E]"
            >
              ✕
            </button>

            <div className="flex items-center gap-4 mb-4">
              <img
                src={selectedUser.avatarUrl}
                alt={selectedUser.name}
                className="w-14 h-14 rounded-2xl border border-[#E8E3FF]"
              />
              <div>
                <h3 className="text-lg font-extrabold text-[#1E1B2E]">
                  {selectedUser.name}
                </h3>
                <span className="text-xs text-[#6B6785] font-medium block">
                  {selectedUser.email}
                </span>
                <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#F5F2FF] text-[#8B7FE8]">
                  {selectedUser.role} • {selectedUser.subscription}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-6 text-xs font-bold text-[#1E1B2E]">
              <div className="bg-[#F8F9FC] p-3 rounded-2xl border border-[#E8E3FF]">
                <span className="text-[10px] text-[#6B6785] block uppercase">Total XP</span>
                <span className="text-base text-[#8B7FE8] font-black">{selectedUser.xp}</span>
              </div>
              <div className="bg-[#F8F9FC] p-3 rounded-2xl border border-[#E8E3FF]">
                <span className="text-[10px] text-[#6B6785] block uppercase">Coins Balance</span>
                <span className="text-base text-[#D97706] font-black">{selectedUser.coins}</span>
              </div>
            </div>

            <button
              onClick={() => setSelectedUser(null)}
              className="w-full py-2.5 rounded-2xl text-xs font-extrabold text-white bg-[#8B7FE8] hover:bg-[#786BD6]"
            >
              Close Profile View
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
