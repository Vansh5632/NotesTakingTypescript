import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNotes } from "@/contexts/NotesContext";
import { NoteForm } from "./notes/NoteForm";
import { NoteList } from "./notes/NoteList";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { FileText, Clock, Star, Boxes, LogOut, Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "./ui/alert";

interface StatsCardProps {
  title: string;
  value: number;
  icon: React.ElementType;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon: Icon }) => (
  <Card className="bg-gradient-to-br from-gray-50 via-white to-gray-200 shadow-xl border border-gray-200 rounded-xl backdrop-blur-md hover:scale-105 transition-transform duration-300">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium text-gray-700">{title}</CardTitle>
      <Icon className="h-6 w-6 text-gray-500" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold text-gray-800">{value}</div>
    </CardContent>
  </Card>
);

const LoadingState: React.FC = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="flex flex-col items-center gap-4">
      <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
      <p className="text-gray-600">Loading your notes...</p>
    </div>
  </div>
);

const ErrorState: React.FC<{ error: string }> = ({ error }) => (
  <Alert variant="destructive" className="mx-auto max-w-2xl mt-8">
    <AlertDescription>{error}</AlertDescription>
  </Alert>
);

const HomePage: React.FC = () => {
  const { user, logout } = useAuth();
  const { notes = [], isLoading, error } = useNotes();

  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState error={error} />;

  const totalNotes = Array.isArray(notes) ? notes.length : 0;
  const recentNotes = Array.isArray(notes) 
    ? notes.filter(
        (note) => new Date(note.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      ).length 
    : 0;
  const favoriteNotes = Array.isArray(notes)
    ? notes.filter((note) => note.favorite).length
    : 0;

  const handleLogout = async () => {
    try {
      await logout();
      // Redirect is typically handled by your AuthContext/Router
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 text-gray-900">
      {/* Navbar */}
      <nav className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-wide">📝 Notes Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium">Welcome, {user?.name}</span>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-white hover:text-red-400"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4 mr-1" /> Logout
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8 p-6 bg-gradient-to-br from-white to-gray-100 border rounded-xl shadow-md backdrop-blur-lg">
          <h2 className="text-3xl font-semibold mb-2 text-gray-800">Welcome to Your Notes Dashboard</h2>
          <p className="text-gray-600">
            Create, organize, and manage your notes all in one place. Get started by creating a new note below.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <StatsCard title="Total Notes" value={totalNotes} icon={FileText} />
          <StatsCard title="Recent Notes" value={recentNotes} icon={Clock} />
          <StatsCard title="Favorites" value={favoriteNotes} icon={Star} />
        </div>

        {/* Main Grid */}
        <div className="grid gap-6 md:grid-cols-12">
          {/* Sidebar */}
          <aside className="md:col-span-3 space-y-6">
            <Card className="bg-gradient-to-br from-gray-50 via-white to-gray-100 shadow-lg border border-gray-200 rounded-xl">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-700">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start hover:bg-indigo-50">
                  <FileText className="h-5 w-5 mr-2 text-indigo-500" /> New Note
                </Button>
                <Button variant="outline" className="w-full justify-start hover:bg-yellow-50">
                  <Star className="h-5 w-5 mr-2 text-yellow-500" /> Favorites
                </Button>
                <Button variant="outline" className="w-full justify-start hover:bg-blue-50">
                  <Boxes className="h-5 w-5 mr-2 text-blue-500" /> Categories
                </Button>
              </CardContent>
            </Card>
          </aside>

          {/* Notes Section */}
          <main className="md:col-span-9 space-y-6">
            {/* Note Form */}
            <section>
              <Card className="bg-gradient-to-br from-gray-50 via-white to-gray-100 shadow-lg rounded-xl p-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Create a New Note</h2>
                <NoteForm />
              </Card>
            </section>

            {/* Note List */}
            <section>
              <Card className="bg-gradient-to-br from-white to-gray-50 shadow-md rounded-xl p-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Your Notes</h2>
                {Array.isArray(notes) && notes.length > 0 ? (
                  <NoteList />
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    No notes yet. Create your first note above!
                  </div>
                )}
              </Card>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
};

export default HomePage;