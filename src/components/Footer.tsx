export function Footer() {
    return (
        <footer className="bg-foreground text-background py-12">
            <div className="container mx-auto px-6 flex flex-col items-center gap-6 text-center">
                <h2 className="text-3xl font-bold text-cobalt-green">Jorinde & Dolf</h2>
                <p className="text-background/60 max-w-md">
                    We can't wait to celebrate our special day with you.
                </p>

                <div className="w-full h-px bg-background/10 my-4" />

                <div className="flex flex-col sm:flex-row justify-between items-center w-full text-sm text-background/40 gap-4">
                    <p>&copy; {new Date().getFullYear()} Jorinde & Dolf. All rights reserved.</p>
                    <p>Designed with ❤️ & Next.js</p>
                </div>
            </div>
        </footer>
    );
}
